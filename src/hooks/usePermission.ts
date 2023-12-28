import { roles } from "../constants";
import { UserInfo } from "../store";

const usePermission = () => {
  const allowedRoles = [roles.admin, roles.manager];

  const _isPermitted = (user: UserInfo) => {
    if (allowedRoles.includes(user.role)) {
      return true;
    }

    return false;
  };

  return {
    _isPermitted,
  };
};

export default usePermission;
