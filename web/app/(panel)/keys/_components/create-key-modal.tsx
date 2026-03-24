"use client";

import { Modal, FormInput, FormSelect } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import type { User } from "@/lib/types";

interface CreateKeyForm {
  appName: string;
  packageName: string;
  userId: string;
}

interface CreateKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: CreateKeyForm;
  onFormChange: (form: CreateKeyForm) => void;
  onSubmit: (e: React.FormEvent) => void;
  isAdmin: boolean;
  users: User[];
}

export function CreateKeyModal({
  isOpen,
  onClose,
  form,
  onFormChange,
  onSubmit,
  isAdmin,
  users,
}: CreateKeyModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create API Key">
      <form onSubmit={onSubmit} className="space-y-4">
        <FormInput
          label="App Name"
          value={form.appName}
          onChange={(e) => onFormChange({ ...form, appName: e.target.value })}
          placeholder="My App"
          required
        />
        <FormInput
          label="Package Name"
          value={form.packageName}
          onChange={(e) => onFormChange({ ...form, packageName: e.target.value })}
          placeholder="com.example.app"
          required
        />
        {isAdmin && users.length > 0 && (
          <FormSelect
            label="Assign to User"
            value={form.userId}
            onChange={(e) => onFormChange({ ...form, userId: e.target.value })}
          >
            <option value="">Myself (Admin)</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username} ({u.email})
              </option>
            ))}
          </FormSelect>
        )}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button size="sm" type="submit">
            Create Key
          </Button>
        </div>
      </form>
    </Modal>
  );
}
