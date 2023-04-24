export type MESSAGE_TYPE_MODAL = 'success' | 'ask' | 'danger';
export type MESSAGE_TYPE_MODAL_STATIC = 'success' | 'danger';

export interface MESSAGE_MODAL {
  id: string;
  text: string;
  type: MESSAGE_TYPE_MODAL;
  isOkCancel: boolean;
}

export type MESSAGE_MODAL_RESOLVER_ASYNC = (
  value: boolean | PromiseLike<boolean>
) => void;
export interface MESSAGE_MODAL_RESOLVERS_DICT {
  [id: string]: MESSAGE_MODAL_RESOLVER_ASYNC;
}
