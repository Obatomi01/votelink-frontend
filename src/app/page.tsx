import { redirect } from 'next/navigation';

import { useRouter } from 'next/navigation';

function FirstPage() {
  redirect('/login');
}

export default FirstPage;
