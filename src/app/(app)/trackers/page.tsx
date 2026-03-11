"use client";

import { useState } from 'react';
import { TrackerCard } from '@/components/trackers/TrackerCard';
import { TrackerForm } from '@/components/trackers/TrackerForm';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useTrackers, useCreateTracker, useUpdateTracker, useDeleteTracker, type CreateTrackerInput } from '@/hooks/useTrackers';
import { useWorkspaces } from '@/hooks/use-workspaces';
import { Radio, Plus } from 'lucide-react';
import type { Tracker } from '@/types/app';

export default function TrackersPage() {
  const { activeWorkspace } = useWorkspaces();
  const { trackers, isLoading } = useTrackers(activeWorkspace?.id ?? null);
  const createTracker = useCreateTracker();
  const updateTracker = useUpdateTracker();
  const deleteTracker = useDeleteTracker();

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<Tracker | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleCreate = (data: CreateTrackerInput) => {
    createTracker.mutate(data, { onSuccess: () => setSheetOpen(false) });
  };

  const handleEdit = (tracker: Tracker) => {
    setEditing(tracker);
    setSheetOpen(true);
  };

  const handleUpdate = (data: CreateTrackerInput) => {
    if (!editing) return;
    updateTracker.mutate({ id: editing.id, workspace_id: editing.workspace_id, ...data }, { onSuccess: () => { setSheetOpen(false); setEditing(null); } });
  };

  const handleToggle = (id: string, active: boolean) => {
    const tracker = trackers.find((t) => t.id === id);
    if (!tracker) return;
    updateTracker.mutate({ id, workspace_id: tracker.workspace_id, is_active: active });
  };

  const handleDelete = () => {
    if (!deleteId || !activeWorkspace) return;
    deleteTracker.mutate({ id: deleteId, workspaceId: activeWorkspace.id }, { onSuccess: () => setDeleteId(null) });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-zinc-400">{trackers.length} tracker{trackers.length !== 1 ? 's' : ''} configured</p>
          <Button
            size="sm"
            className="bg-emerald-500 hover:bg-emerald-600"
            onClick={() => { setEditing(null); setSheetOpen(true); }}
            data-testid="button-new-tracker"
          >
            <Plus className="h-4 w-4 mr-1" /> New Tracker
          </Button>
        </div>

        {isLoading && <div className="flex justify-center py-12"><LoadingSpinner /></div>}

        {!isLoading && trackers.length === 0 && (
          <EmptyState
            icon={Radio}
            title="No trackers yet"
            description="Create your first tracker to start monitoring buying signals."
            action={{ label: 'Create Tracker', onClick: () => setSheetOpen(true) }}
          />
        )}

        {!isLoading && trackers.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trackers.map((tracker) => (
              <TrackerCard
                key={tracker.id}
                tracker={tracker}
                onEdit={handleEdit}
                onDelete={setDeleteId}
                onToggle={handleToggle}
              />
            ))}
          </div>
        )}
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="bg-background border-border text-white w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-white">{editing ? 'Edit Tracker' : 'New Tracker'}</SheetTitle>
          </SheetHeader>
          {activeWorkspace && (
            <TrackerForm
              initial={editing ?? undefined}
              workspaceId={activeWorkspace.id}
              onSubmit={editing ? handleUpdate : handleCreate}
              onCancel={() => setSheetOpen(false)}
              isPending={createTracker.isPending || updateTracker.isPending}
            />
          )}
        </SheetContent>
      </Sheet>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Tracker"
        description="This will permanently delete the tracker and stop all monitoring. This cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        isPending={deleteTracker.isPending}
      />
    </div>
  );
}
