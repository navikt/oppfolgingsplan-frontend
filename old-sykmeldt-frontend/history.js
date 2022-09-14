import useScroll from 'scroll-behavior/lib/useStandardScroll';
import { browserHistory } from 'react-router';

// eslint-disable-next-line react-hooks/rules-of-hooks
const history = useScroll(() => {
  return browserHistory;
})();

export default history;
