let timer: ReturnType<typeof setTimeout>;

export function messageControl(setMessage: (text: string) => void, text: string, duration: number = 2000): void {
  setMessage(text);  
  clearTimeout(timer);
  timer = setTimeout(() => {
      setMessage("");
    }, duration);
}