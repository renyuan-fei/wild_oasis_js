import {HiArrowRightOnRectangle} from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import SpinnerMini from '../../ui/SpinnerMini';
import {useLogout} from './useLogut.js';

function Logout() {
  const {logout, isLoading} = useLogout();
  
  return (
      <ButtonIcon disabled={isLoading} onClick={logout}>
        {!isLoading ? <HiArrowRightOnRectangle/> : <SpinnerMini/>}
      </ButtonIcon>
  );
}

export default Logout;
