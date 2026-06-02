import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
    private readonly genAI: GoogleGenerativeAI;

    constructor(
        private readonly configService: ConfigService,
    ) {
        this.genAI = new GoogleGenerativeAI(
            this.configService.get<string>(
                'GEMINI_API_KEY',
            )!,
        );
    }

    async evaluateSubmission(
        pdfText: string,
        criteria: any[],
    ) {
        try {
            const model =
                this.genAI.getGenerativeModel({
                    model: 'gemini-2.0-flash',
                });

            const formattedCriteria = criteria
                .map(
                    (criterion) =>
                        `Critério: ${criterion.title}
Peso: ${criterion.weight}
Descrição: ${criterion.description}`,
                )
                .join('\n\n');

            const prompt = `
Você é um professor avaliador.

Analise o texto enviado pelo aluno.

Critérios:

${formattedCriteria}

Texto do aluno:

${pdfText}

IMPORTANTE:
Retorne APENAS JSON válido.
Sem markdown.

Formato:

{
  "notaFinal": number,
  "criterios": [
    {
      "criterio": "nome",
      "nota": number,
      "observacao": "texto"
    }
  ],
  "consideracoes": "texto final"
}
`;

            const result =
                await model.generateContent(prompt);

            const response =
                result.response.text();

            const cleanedResponse = response
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();

            return JSON.parse(cleanedResponse);
        } catch (error) {
            console.error(error);

            return {
                notaFinal: 0,

                criterios: [],

                consideracoes:
                    'Erro ao gerar avaliação IA.',
            };
        }
    }
}