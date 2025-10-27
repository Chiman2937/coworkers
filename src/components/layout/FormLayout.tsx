import { cn } from '@/lib/utils';

interface LayoutFormType {
  children: React.ReactNode;
  className?: string;
}

const FormLayout = ({ children, className }: LayoutFormType) => {
  return (
    <main className='md:pl-sidebar-closed pt-header fixed inset-0 flex min-h-screen items-center justify-center md:pt-0'>
      <section
        className={cn('bg-background-primary rounded-5x mx-4 w-full max-w-[550px]', className)}
      >
        {children}
      </section>
    </main>
  );
};

export default FormLayout;
