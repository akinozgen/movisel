# Movisel
[![CodeFactor](https://www.codefactor.io/repository/github/akinozgen/Movisel/badge)](https://www.codefactor.io/repository/github/akinozgen/Movisel)

Development:
1. Run this command to create your `.env` file:  `cp .env.example .env`
2. Fill the supabase values in `.env` file
    * Create a supabase account at [https://app.supabase.io/](https://app.supabase.io/)
    * Create an app [https://app.supabase.io/new](https://app.supabase.io/new)
    * Go to settings page of your app and click API
    * Under "Project API keys" > "anon/public" is your Public Key
    * Under "Config" > "URL" is your Supabase URL
      * Fill the values as shown
      * `VUE_APP_SUPABASE_URL`=**YOUR_SUPABASE_URL**
      * `VUE_APP_SUPABASE_PUBLIC_KEY`=**YOUR_SUPABASE_PUBLIC_KEY**
    * Enable email auth under "Authentication" > "Email Auth"
    * In supabase admin panel > "Authentication" > "General" section, fill your "Site URL" as: "https://localhost:8080" 
    * In supabase admin panel > "Authentication" > "General" section, fill your "Additional Redirect URLs" as: "https://localhost:8080" 
3. Fill TMDB values in `.env` file
    * Create a TMDB account at [https://www.themoviedb.org/](https://www.themoviedb.org/)
    * Go to Settings page [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
    * Down below there should be you v3 api key and JWT token.
    * Get API key and JWT (json web token) from TMDB
    * Fill these values as show.
    * `VUE_APP_TMDB_API_KEY`=**YOUR_TMDB_API_KEY**
    * `VUE_APP_TMDB_JWT`=**YOUR_TMDB_JWT**

Database Creation:
1. Go to supabase app "Database" section.
2. Create tables from [db_schema](/db_schema)
