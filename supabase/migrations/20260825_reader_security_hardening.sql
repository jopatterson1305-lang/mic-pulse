-- The auth trigger invokes this function internally; it is not an application RPC.
-- Remove exposed API execution while retaining trigger execution by the database owner.
revoke execute on function public.handle_new_user() from public;
