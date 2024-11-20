import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.46.1/+esm";

const supabaseUrl = "https://cemlsqxunksbczwpfutn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlbWxzcXh1bmtzYmN6d3BmdXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1NDU5MTgsImV4cCI6MjA0NDEyMTkxOH0.ALPTCxrQNJkv9s-DJLYoUkENgDS32C4IRTcusojhDzI";

export const supabase = createClient(supabaseUrl, supabaseKey);
