/**
 * Concept is to avoid scattering `step === N` conditionals throughout JSX.
 * Instead, define each step as a separate object with:
 *   - renderFields: renders the form fields for this step
 *   - renderActions: renders the action button(s) for this step
 */
export type Step<TContext> = {
    renderFields: (ctx: TContext) => React.ReactNode;
    renderActions: (ctx: TContext) => React.ReactNode;
};