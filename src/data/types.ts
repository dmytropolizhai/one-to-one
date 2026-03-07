export type ActionState<T> = {
    success: boolean;
    errors?: Partial<Record<keyof T, string[]>>;
    message?: string;
};