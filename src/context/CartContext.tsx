import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  cartLineKey,
  defaultFlavor,
  defaultSize,
  findProduct,
  resolveProductId,
  type ProductId,
} from "../data/products";

const STORAGE_KEY = "aura-cart-v2";

export type CartLine = {
  key: string;
  id: ProductId;
  flavor?: string;
  size: string;
  qty: number;
};

type AddOptions = {
  flavor?: string;
  size?: string;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  toast: string | null;
  clearToast: () => void;
  add: (id: ProductId, options?: AddOptions) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function normalizeLine(raw: Partial<CartLine> & { id?: string; qty?: number }): CartLine | null {
  if (!raw || typeof raw.id !== "string" || !(Number(raw.qty) > 0)) return null;
  const id = resolveProductId(raw.id as ProductId);
  const product = findProduct(id);
  if (!product) return null;
  const flavor = raw.flavor ?? defaultFlavor(product);
  const size = raw.size ?? defaultSize(product);
  return {
    key: raw.key ?? cartLineKey(id, flavor, size),
    id,
    flavor,
    size,
    qty: Number(raw.qty),
  };
}

function readStored(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem("aura-cart");
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Array<Partial<CartLine>>;
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeLine).filter((line): line is CartLine => line !== null);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readStored);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const clearToast = useCallback(() => setToast(null), []);

  const add = useCallback((id: ProductId, options?: AddOptions) => {
    const product = findProduct(id);
    if (!product) return;
    const flavor = options?.flavor ?? defaultFlavor(product);
    const size = options?.size ?? defaultSize(product);
    const key = cartLineKey(id, flavor, size);

    setLines((current) => {
      const found = current.find((line) => line.key === key);
      if (found) {
        return current.map((line) =>
          line.key === key ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [...current, { key, id: resolveProductId(id), flavor, size, qty: 1 }];
    });
    setToast("Added to cart successfully");
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((current) => {
      if (qty <= 0) return current.filter((line) => line.key !== key);
      return current.map((line) => (line.key === key ? { ...line, qty } : line));
    });
  }, []);

  const remove = useCallback((key: string) => {
    setLines((current) => current.filter((line) => line.key !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const count = useMemo(
    () => lines.reduce((sum, line) => sum + line.qty, 0),
    [lines],
  );

  const value = useMemo(
    () => ({ lines, count, open, setOpen, toast, clearToast, add, setQty, remove, clear }),
    [lines, count, open, toast, clearToast, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
