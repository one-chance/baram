export default interface IMyAlert {
  isOpen: boolean,
  severity: "success" | "error" | "info" | "warning",
  message: string,
  duration: number
}