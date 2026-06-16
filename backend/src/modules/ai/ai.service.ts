import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import {
    GoogleGenerativeAI,
    SchemaType,
} from '@google/generative-ai';

export interface AiCriterionResult {
    criterio: string;
    nota: number;
    observacao: string;
}

export interface AiEvaluationResult {
    notaFinal: number;
    criterios: AiCriterionResult[];
    consideracoes: string;
}

const EVALUATION_SCHEMA = {
    type: SchemaType.OBJECT,
    properties: {
        notaFinal: {
            type: SchemaType.NUMBER,
            description:
                'Nota final ponderada (0 a 10), considerando o peso de cada critério.',
        },
        criterios: {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    criterio: {
                        type: SchemaType.STRING,
                        description: 'Nome do critério avaliado.',
                    },
                    nota: {
                        type: SchemaType.NUMBER,
                        description: 'Nota atribuída ao critério (0 a 10).',
                    },
                    observacao: {
                        type: SchemaType.STRING,
                        description:
                            'Comentário específico sobre o desempenho do aluno nesse critério.',
                    },
                },
                required: ['criterio', 'nota', 'observacao'],
            },
        },
        consideracoes: {
            type: SchemaType.STRING,
            description:
                'Feedback geral, construtivo e útil para o aluno sobre a atividade como um todo.',
        },
    },
    required: ['notaFinal', 'criterios', 'consideracoes'],
};

@Injectable()
export class AiService {
    private readonly genAI: GoogleGenerativeAI;
    private readonly model: string;

    constructor(private readonly configService: ConfigService) {
        this.genAI = new GoogleGenerativeAI(
            this.configService.get<string>('GEMINI_API_KEY')!,
        );

        this.model =
            this.configService.get<string>('GEMINI_MODEL') ??
            'gemini-2.5-flash';
    }

    async evaluateSubmission(
        pdfText: string,
        criteria: any[],
    ): Promise<AiEvaluationResult> {
        try {
            const generativeModel = this.genAI.getGenerativeModel({
                model: this.model,
                generationConfig: {
                    responseMimeType: 'application/json',
                    responseSchema: EVALUATION_SCHEMA as any,
                },
            });

            const formattedCriteria = criteria.length
                ? criteria
                    .map(
                        (criterion) =>
                            `- Critério: "${criterion.title}" | Peso: ${criterion.weight} | Descrição: ${criterion.description}`,
                    )
                    .join('\n')
                : '- Nenhum critério específico foi cadastrado. Avalie de forma geral o conteúdo, clareza, organização e correção do trabalho.';

            const totalWeight = criteria.length
                ? criteria.reduce((sum, c) => sum + (c.weight ?? 0), 0)
                : 0;

            const prompt = `Você é um professor avaliador especialista, responsável por corrigir atividades acadêmicas de forma justa, criteriosa e construtiva.

## Critérios de avaliação
${formattedCriteria}
${totalWeight > 0 ? `\nPeso total dos critérios: ${totalWeight}. Calcule "notaFinal" como a média ponderada das notas de cada critério (nota de 0 a 10 cada), normalizada para uma escala de 0 a 10.` : '\nCalcule "notaFinal" como a média das notas atribuídas, em uma escala de 0 a 10.'}

## Texto extraído do documento enviado pelo aluno
"""
${pdfText}
"""

## Instruções
- Avalie CADA critério individualmente, atribuindo uma nota de 0 a 10 e uma observação específica e útil.
- Se não houver critérios cadastrados, crie uma avaliação geral única chamada "Avaliação Geral".
- "consideracoes" deve ser um feedback geral construtivo, apontando pontos fortes e sugestões de melhoria para o aluno.`;

            const result = await generativeModel.generateContent(prompt);

            const response = result.response.text();

            const cleanedResponse = response
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();

            return JSON.parse(cleanedResponse);
        } catch (error) {
            console.error('Erro ao avaliar submissão com Gemini:', error);

            return {
                notaFinal: 0,
                criterios: [],
                consideracoes:
                    'Erro ao gerar avaliação com IA. Tente novamente ou avalie manualmente.',
            };
        }
    }
}
