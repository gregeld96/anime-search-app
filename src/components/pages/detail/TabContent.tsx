import { useSelector } from 'react-redux';
import { selectActiveTab } from '../../../store/tabSlice';
import EpisodesTab from './tabs/EpisodesTab';
import DetailsTab from './tabs/DetailsTab';
import type { Anime } from '../../../type/index';

interface TabContentProps {
  anime: Anime | undefined;
  episodesResponse: any;
  episodesLoading: boolean;
  episodesPage: number;
  setEpisodesPage: (page: number) => void;
}

export default function TabContent({ 
  anime, 
  episodesResponse, 
  episodesLoading, 
  episodesPage, 
  setEpisodesPage 
}: TabContentProps) {
  const activeTab = useSelector(selectActiveTab);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'episodes':
        return (
          <EpisodesTab
            episodesResponse={episodesResponse}
            episodesLoading={episodesLoading}
            episodesPage={episodesPage}
            setEpisodesPage={setEpisodesPage}
          />
        );
      case 'details':
        return <DetailsTab anime={anime} />;
      default:
        return null;
    }
  };

  return <>{renderTabContent()}</>;
}