import { db } from '..';

import type { User } from '@/types/User';

interface PaginationProps {
  pageSize?: number;
  startAfter?: string;
  endBefore?: string;
}

type GetUserProps = PaginationProps | { search: string };

export async function getUsers(props: GetUserProps): Promise<User[]> {
  let query = db.collection('users').orderBy('email');

  if (!('search' in props)) {
    if (props.startAfter) {
      query = query.startAfter(props.startAfter);
    }

    if (props.endBefore && props.pageSize) {
      query = query.endBefore(props.endBefore).limitToLast(props.pageSize);
    } else if (props.pageSize) {
      query = query.limit(props.pageSize);
    }
  }

  const snapshot = await query.get();

  const users = snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as User)
  );

  if ('search' in props) {
    return users.filter((user) => {
      return user.email
        .toLocaleLowerCase()
        .startsWith(props.search.trim().toLocaleLowerCase());
    });
  }

  return users;
}
