import React from 'react';
import useSettings from '../../hooks/useSettings';
import TopicManager from './TopicManager';
import SourceManager from './SourceManager';
import CompetitorManager from './CompetitorManager';
import LoadingSpinner from '../shared/LoadingSpinner';

export default function SettingsPage() {
  const { topics, sources, competitors, loading, refresh, api } = useSettings();

  const handleCreateTopic = async (name) => {
    await api.createTopic(name);
    refresh();
  };

  const handleDeleteTopic = async (id) => {
    await api.deleteTopic(id);
    refresh();
  };

  const handleCreateSource = async (name, type) => {
    await api.createSource(name, type);
    refresh();
  };

  const handleDeleteSource = async (id) => {
    await api.deleteSource(id);
    refresh();
  };

  const handleCreateCompetitor = async (name) => {
    await api.createCompetitor(name);
    refresh();
  };

  const handleDeleteCompetitor = async (id) => {
    await api.deleteCompetitor(id);
    refresh();
  };

  if (loading && topics.length === 0 && sources.length === 0) {
    return <LoadingSpinner size={32} style={{ marginTop: '100px' }} />;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <TopicManager 
        topics={topics} 
        onCreate={handleCreateTopic} 
        onDelete={handleDeleteTopic} 
      />
      <SourceManager 
        sources={sources} 
        onCreate={handleCreateSource} 
        onDelete={handleDeleteSource} 
      />
      <CompetitorManager 
        competitors={competitors} 
        onCreate={handleCreateCompetitor} 
        onDelete={handleDeleteCompetitor} 
      />
    </div>
  );
}
