import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import EditNoteIcon from "@mui/icons-material/EditNote";
import SellIcon from "@mui/icons-material/Sell";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import EditCoreInsightsModal from "./editCoreInsightsModal";
import EditVideoTagsModal from "./editVideoTagsModal";

import { REMOVE_VIDEO, UPDATE_VIDEO_CORE_INSIGHT, UPDATE_VIDEO_TAGS } from "../redux/actionTypes";
import { selectVideosForSelectedPlaylist, selectVideosTotal } from "../redux/selectors";
import { selectSelectedPlaylistId } from "../redux/selectors";
import { selectTagItems } from "../redux/selectors";

const columns = [
  { id: "title", label: "Video", minWidth: 260 },
  { id: "channel", label: "Channel", minWidth: 160 },
  { id: "tags", label: "Tags", minWidth: 220 },
  { id: "coreInsights", label: "Core Insights", minWidth: 140 },
  { id: "addedAt", label: "Added", minWidth: 120, align: "right" },
  { id: "remove", label: "", minWidth: 70, align: "right" },
];

// Helper to format dates like "Jan 10, 2026"
function formatDate(iso) {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default function PlaylistTable() {
  const dispatch = useDispatch();

  const selectedPlaylistId = useSelector(selectSelectedPlaylistId);
  const videoEntities = useSelector(selectVideosForSelectedPlaylist);
  const tagEntities = useSelector(selectTagItems);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [editCoreInsightsModalOpen, setEditCoreInsightsModalOpen] = useState(false);
  const [editVideoTagsModalOpen, setEditVideoTagsModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const pagedVideos = useMemo(() => {
    return videoEntities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [videoEntities, page, rowsPerPage]);

  const openCoreInsights = (videoEntity) => {
    setActiveVideo(videoEntity);
    setEditCoreInsightsModalOpen(true);
  };

  const openEditTags = (videoEntity) => {
    setActiveVideo(videoEntity);
    setEditVideoTagsModalOpen(true);
  };

  const handleRemoveFromPlaylist = (videoEntity) => {
    const videoTitle = videoEntity.title;
    const ok = window.confirm(`Remove "${videoTitle}" from this playlist?`);
    if (!ok) return;

    const videoId = videoEntity.id;
    if (!selectedPlaylistId || !videoId) return;

    dispatch({
      type: REMOVE_VIDEO,
      payload: { playlistId: selectedPlaylistId, videoId },
    });
  };

  const count = videoEntities.length;

  return (
    <Paper sx={{
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  }}>
      <TableContainer sx={{
        flex: 1,
        overflowY: "auto",
      }}>
        <Table stickyHeader aria-label="videos table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  sx={{ minWidth: column.minWidth, fontWeight: 600 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {pagedVideos.map((videoEntity) => {
              const videoId = videoEntity.id;
              const videoTitle = videoEntity.title;
              const videoUrl = videoEntity.link;
              const videoChannel = videoEntity.channel;
              const videoCreatedAt = videoEntity.createdAt;

              const tags = videoEntity.tags;
              const hasTags = Array.isArray(tags) && tags.length > 0;

              const coreInsights = videoEntity.coreInsights;
              const hasInsight = Boolean(coreInsights && String(coreInsights).trim().length > 0);

              return (
                <TableRow hover tabIndex={-1} key={videoId}>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Link href={videoUrl} target="_blank" rel="noreferrer" underline="hover">
                        <Typography variant="body2" fontWeight={600} noWrap>
                          {videoTitle}
                        </Typography>
                      </Link>
                      <Typography variant="caption" color="text.secondary">
                        {videoUrl}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>{videoChannel || "—"}</TableCell>

                  <TableCell>
                    <Stack spacing={1} alignItems="flex-start">
                      {hasTags ? (
                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                          {tags.slice(0, 6).map((tagEntity) => (
                            <Chip key={tagEntity.id} label={tagEntity.title} size="small" />
                          ))}

                          {tags.length > 6 ? <Chip label={`+${tags.length - 6}`} size="small" /> : null}

                          <Tooltip title="Edit tags">
                            <IconButton
                              size="small"
                              onClick={() => openEditTags(videoEntity)}
                              sx={{ borderRadius: 2, "&:hover": { bgcolor: "action.hover" } }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      ) : (
                        <Button
                          size="small"
                          variant="text"
                          startIcon={<SellIcon />}
                          onClick={() => openEditTags(videoEntity)}
                          sx={{ textTransform: "none", alignSelf: "flex-start" }}
                        >
                          Add tags
                        </Button>
                      )}
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Button
                        size="small"
                        variant={hasInsight ? "outlined" : "contained"}
                        startIcon={<EditNoteIcon />}
                        onClick={() => openCoreInsights(videoEntity)}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          boxShadow: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {hasInsight ? "View / Edit" : "Add"}
                      </Button>

                      {hasInsight ? (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            bgcolor: "success.main",
                            opacity: 0.8,
                          }}
                          title="Has insight"
                        />
                      ) : null}
                    </Stack>
                  </TableCell>

                  <TableCell align="right">{formatDate(videoCreatedAt)}</TableCell>

                  <TableCell align="right">
                    <Tooltip title="Remove from playlist">
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveFromPlaylist(videoEntity)}
                        sx={{ borderRadius: 2, "&:hover": { bgcolor: "action.hover" } }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <EditCoreInsightsModal
        open={editCoreInsightsModalOpen}
        onClose={() => {
          setEditCoreInsightsModalOpen(false);
          setActiveVideo(null);
        }}
        video={activeVideo}
      />

      <EditVideoTagsModal
        open={editVideoTagsModalOpen}
        onClose={() => {
          setEditVideoTagsModalOpen(false);
          setActiveVideo(null);
        }}
        video={activeVideo}
        allTags={tagEntities}
        onSave={({ videoId, tagIds }) => {
          dispatch({
            type: UPDATE_VIDEO_TAGS,
            payload: { videoId, tagIds },
          });
        }}
      />
    </Paper>
  );
}
