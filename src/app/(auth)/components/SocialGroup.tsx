import IconKakao from '@/assets/icons/icon_kakao.svg';

interface Props {
  type: 'signin' | 'signup';
}

const SocialGroup = ({ type }: Props) => {
  const messageTypeMap = {
    signup: '간편 회원가입하기',
    signin: '간편 로그인하기',
  };

  return (
    <div className='flex justify-between'>
      <span className='text-lg-medium text-text-default'>{messageTypeMap[type]}</span>
      <div className='flex gap-2'>
        <button>
          <IconKakao />
        </button>
      </div>
    </div>
  );
};

export default SocialGroup;
