import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://ktrennvdieiobdkohdil.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjMzM2UzNjA0LTIxYmUtNGY0Ni1hM2RiLWQ1ZTI3NDZlNzg0NyJ9.eyJwcm9qZWN0SWQiOiJrdHJlbm52ZGllaW9iZGtvaGRpbCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY0ODI3OTczLCJleHAiOjIwODAxODc5NzMsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.wOLHadhqzB-i2VYlxW5Lvl9YJVWk0t_KNK0cKuhd2ak';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };
