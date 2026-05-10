import { Injectable } from '@nestjs/common';
import { FileDTO } from './upload.dto';
import { createClient } from '@supabase/supabase-js'

@Injectable()
export class UploadService {

    async upload(file: FileDTO){
        const supabaseURL = 'https://nczryqzbgputgzqamdgb.supabase.co'
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jenJ5cXpiZ3B1dGd6cWFtZGdiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM3MTkyOCwiZXhwIjoyMDkyOTQ3OTI4fQ.vCAY9gxfnVw451KIDWh3F0IeaIGipjbPEtOwYjef2uY'
        const supabase = createClient(supabaseURL, supabaseKey, {
            auth:{
                persistSession: false
            }
        })

        const data = await supabase.storage.from("Files").upload(file.originalname, file.buffer, {
            upsert: true
        })

        return data;
    }
}
