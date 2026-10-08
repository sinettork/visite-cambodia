

## Follow-up credential test

A real browser sign-in attempt was made against `/admin/login` using the credentials supplied by the task owner. The form accepted the email and password, but submission did not reach authentication: the local app returned the same Astro error overlay with `{"message":"Invalid API key","hint":"Double check your API key."}` and remained on `/admin/login`.

**Conclusion:** the credentials could not be accepted or rejected because Supabase initialization fails first. A valid `PUBLIC_SUPABASE_PUBLISHABLE_KEY` is required before authenticated admin UX testing can continue. No source files were changed during the credential test.
