import { MemberShell } from '@/components/member-shell';
export const metadata = { title: 'Your member space' };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <MemberShell>{children}</MemberShell>;
}
