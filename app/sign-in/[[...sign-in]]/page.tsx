import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="  bg-sky-400   flex-grow">
      <SignIn />
    </div>
  );
}
