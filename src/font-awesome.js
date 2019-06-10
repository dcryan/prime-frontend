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
import { faStepBackward } from '@fortawesome/pro-solid-svg-icons/faStepBackward';
import { faPlay } from '@fortawesome/pro-solid-svg-icons/faPlay';
import { faPause } from '@fortawesome/pro-solid-svg-icons/faPause';
import { faStepForward } from '@fortawesome/pro-solid-svg-icons/faStepForward';
import { faUsers } from '@fortawesome/pro-solid-svg-icons/faUsers';
import { faDice } from '@fortawesome/pro-solid-svg-icons/faDice';
import { faHome } from '@fortawesome/pro-solid-svg-icons/faHome';
import { faSignOut } from '@fortawesome/pro-solid-svg-icons/faSignOut';
import { faChevronLeft } from '@fortawesome/pro-solid-svg-icons/faChevronLeft';

/** REGULAR ICONS (PREFIX: far) */
// import { faHourglass } from '@fortawesome/pro-regular-svg-icons/faHourglass';

/** PRO LIGHT ICONS (PREFIX: fal) */
import { faPlayCircle } from '@fortawesome/pro-light-svg-icons/faPlayCircle';
import { faPauseCircle } from '@fortawesome/pro-light-svg-icons/faPauseCircle';

/** BRAND ICONS (PREFIX: fab) */
// import { faWindows } from '@fortawesome/free-brands-svg-icons/faWindows';

export default {
  init: () =>
    library.add(
      faBars,
      faPlus,
      faStepBackward,
      faPlay,
      faPause,
      faStepForward,
      faUsers,
      faDice,
      faHome,
      faSignOut,
      faChevronLeft,

      faPlayCircle,
      faPauseCircle
    ),
};

// <FontAwesomeIcon icon={item.icon as any} fixedWidth={true} />
