export interface StackFrame {
  function: string;
  file: string;
  line: number;
  column?: number;
}
