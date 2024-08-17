import { useState } from 'react';

type CopyToClipboardHook = {
  copied: boolean;
  error: Error | null;
  isLoading: boolean;
  copy: (value: string) => void;
};

const useCopyToClipboard = (): CopyToClipboardHook => {
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const copy = async (value: string) => {
    try {
      setLoading(true);
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Unknown error occurred')
      );
    } finally {
      setLoading(false);
    }
    setTimeout(() => setCopied(false), 3000);
  };

  return { copied, error, isLoading, copy };
};

export default useCopyToClipboard;
