import {
  PublishAction,
  DiscardChangesAction,
  UnpublishAction,
  DeleteAction,
  DuplicateAction,
  // @ts-ignore
} from 'part:@sanity/base/document-actions';

interface DocumentActionsProps {
  id: string;
  liveEdit: boolean;
  published: object;
  type: string;
}

export default function resolveDocumentActions({ type }: DocumentActionsProps) {
  if (type === 'site-config') {
    return [PublishAction, DiscardChangesAction];
  }

  return [PublishAction, DiscardChangesAction, UnpublishAction, DuplicateAction, DeleteAction];
}
