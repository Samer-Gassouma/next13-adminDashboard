"use client";

import { useEffect, useState } from "react";
import { Model } from "@/components/ui/model";
import { Button } from "../ui/button";

interface AlertModelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModel: React.FC<AlertModelProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMoounted, setIsMoounted] = useState(false);

  useEffect(() => {
    setIsMoounted(true);
  }, []);

  if (!isMoounted) {
    return null;
  }

  return (
    <Model
      title="Are you sure?"
      description="This action cannot be undone"
      isOpen={isOpen}
      onClose={onClose}
    >
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button variant="outline" disabled={loading} onClick={onClose}>
                Cancel
            </Button>
            <Button variant="destructive" onClick={onConfirm} disabled={loading} >
                Delete
            </Button>
        </div>
    </Model>
  );
};
