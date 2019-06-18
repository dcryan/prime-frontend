/**
 * Library for all icons used in library
 * Only icons explicitly imported will be used in application
 *
 * To import an entire library:
 * import brands from '@fortawesome/fontawesome-free-brands'
 * fontawesome.library.add(brands);
 *
 *
 */

import { library } from '@fortawesome/fontawesome-svg-core';

/** SOLID ICONS (PREFIX: fas (default)) */
import { faPlus } from '@fortawesome/pro-solid-svg-icons/faPlus';
import { faBars } from '@fortawesome/pro-solid-svg-icons/faBars';
import { faUsers } from '@fortawesome/pro-solid-svg-icons/faUsers';
import { faDice } from '@fortawesome/pro-solid-svg-icons/faDice';
import { faHome } from '@fortawesome/pro-solid-svg-icons/faHome';
import { faSignOut } from '@fortawesome/pro-solid-svg-icons/faSignOut';
import { faChevronLeft } from '@fortawesome/pro-solid-svg-icons/faChevronLeft';

/** REGULAR ICONS (PREFIX: far) */
import { faPlayCircle } from '@fortawesome/pro-regular-svg-icons/faPlayCircle';
import { faPauseCircle } from '@fortawesome/pro-regular-svg-icons/faPauseCircle';
import { faStepBackward } from '@fortawesome/pro-regular-svg-icons/faStepBackward';
import { faStepForward } from '@fortawesome/pro-regular-svg-icons/faStepForward';
import { faList } from '@fortawesome/pro-regular-svg-icons/faList';
import { faCopy } from '@fortawesome/pro-regular-svg-icons/faCopy';

/** PRO LIGHT ICONS (PREFIX: fal) */
// import { faPlayCircle } from '@fortawesome/pro-light-svg-icons/faPlayCircle';
// import { faPauseCircle } from '@fortawesome/pro-light-svg-icons/faPauseCircle';

/** BRAND ICONS (PREFIX: fab) */
// import { faWindows } from '@fortawesome/free-brands-svg-icons/faWindows';

export default {
  init: () =>
    library.add(
      faBars,
      faPlus,
      faUsers,
      faDice,
      faHome,
      faSignOut,
      faChevronLeft,

      faPlayCircle,
      faPauseCircle,
      faStepBackward,
      faStepForward,
      faList,
      faCopy
    ),
};

// <FontAwesomeIcon icon={item.icon as any} fixedWidth={true} />
