/**
 * `toast` with the same calls as Sonner's, but Sonner itself is only imported the
 * first time a toast is shown. Product cards on every page use it, so importing
 * it directly would put the whole library on the critical path.
 */
type Message = Parameters<(typeof import("sonner"))["toast"]["success"]>[0];
type Options = Parameters<(typeof import("sonner"))["toast"]["success"]>[1];

const show = (kind: "success" | "error" | "info") => (message: Message, options?: Options) => {
  void import("sonner").then(({ toast }) => toast[kind](message, options));
};

export const toast = { success: show("success"), error: show("error"), info: show("info") };
