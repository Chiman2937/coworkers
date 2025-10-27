interface Props {
  children: React.ReactNode;
}

const AuthHeader = ({ children }: Props) => {
  return <h2 className='text-2xl-bold pb-8 text-center md:pb-16'>{children}</h2>;
};

export default AuthHeader;
