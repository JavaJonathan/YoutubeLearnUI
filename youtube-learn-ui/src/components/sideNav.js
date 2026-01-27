import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import YouTubeIcon from '@mui/icons-material/YouTube';

import SideNavActions from './sideNavActions';
import SideNavSectionList from './sideNavSectionList';

import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import SellIcon from '@mui/icons-material/Sell';

export default function SideNav({
  drawerWidth,
  playlists,
  tags,
  active,
  selectedPlaylistId,
  selectedTagId,
  onSelectPlaylist,
  onSelectTag,
  onAddVideo,
  onNewPlaylist,
  onNewTag
}) {
  const isPlaylistSelected = id => active === 'playlist_view' && selectedPlaylistId === id;
  const isTagSelected = id => active === 'tag_view' && selectedTagId === id;

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: theme => `1px solid ${theme.palette.divider}`,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh'
        }
      }}
    >
      <Toolbar sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <YouTubeIcon />
        <Box>
          <Typography variant="subtitle1" fontWeight={700} noWrap>
            YouTube Learn
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            Save → Distill → Resurface
          </Typography>
        </Box>
      </Toolbar>

      <Divider />

      <SideNavActions onAddVideo={onAddVideo} onNewPlaylist={onNewPlaylist} onNewTag={onNewTag} />

      <Divider />

      <Box
        sx={{
          px: 1,
          py: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          flex: 1,
          minHeight: 0
        }}
      >
        <SideNavSectionList
          title="Your Playlists"
          items={playlists}
          icon={PlaylistPlayIcon}
          getLabel={p => p.title}
          isSelected={p => isPlaylistSelected(p.id)}
          onSelect={p => onSelectPlaylist(p.id)}
        />

        <Divider />

        <SideNavSectionList
          title="Your Tags"
          items={tags}
          icon={SellIcon}
          getLabel={t => t.title}
          isSelected={t => isTagSelected(t.id)}
          onSelect={t => onSelectTag(t.id)}
        />
      </Box>
    </Drawer>
  );
}
