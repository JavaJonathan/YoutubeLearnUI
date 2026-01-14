import { useState } from "react";
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

const columns = [
  { id: "title", label: "Video", minWidth: 260 },
  { id: "channel", label: "Channel", minWidth: 160 },
  { id: "tags", label: "Tags", minWidth: 220 },
  { id: "coreInsight", label: "Core Insight", minWidth: 140 },
  { id: "addedAt", label: "Added", minWidth: 120, align: "right" },
  { id: "remove", label: "", minWidth: 70, align: "right" },
];

// Helper to format dates like "Jan 10, 2026"
function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

const rows = [
  {
    id: "1",
    title: "How to Study Effectively (Spaced Repetition Explained)",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    channel: "Learning Lab",
    tags: ["Time Horizons", "Second-Order Effects"],
    coreInsight:
      "Spaced repetition works because forgetting is predictable—review right before recall drops.",
    addedAt: "2026-01-10T18:00:00.000Z",
  },
  {
    id: "2",
    title: "Incentives: The Hidden Driver Behind Everything",
    url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    channel: "Econ Explained",
    tags: ["Incentives", "Tradeoffs"],
    coreInsight:
      "Systems don’t get the outcomes you want—they get the outcomes they incentivize.",
    addedAt: "2026-01-09T18:00:00.000Z",
  },
  {
    id: "3",
    title: "How to Study Effectively (Spaced Repetition Explained)",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    channel: "Learning Lab",
    tags: [],
    coreInsight:
      "Spaced repetition works because forgetting is predictable—review right before recall drops.",
    addedAt: "2026-01-10T18:00:00.000Z",
  },
  {
    id: "4",
    title: "Incentives: The Hidden Driver Behind Everything",
    url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    channel: "Econ Explained",
    tags: [],
    coreInsight: "",
    addedAt: "2026-01-09T18:00:00.000Z",
  },
];

export default function PlaylistTable() {
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

  const pagedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const openCoreInsights = (row) => {
    setActiveVideo({
      id: row.id,
      title: row.title,
      ...(row.coreInsight
        ? { coreInsights: { summary: row.coreInsight } }
        : { coreInsights: { summary: "" } }),
    });
    setEditCoreInsightsModalOpen(true);
  };

  const openEditTags = (row) => {
    setActiveVideo({
      id: row.id,
      title: row.title,
      tags: row.tags ?? [],
    });
    setEditVideoTagsModalOpen(true);
  };

  const handleRemoveFromPlaylist = async (row) => {
    const ok = window.confirm(`Remove "${row.title}" from this playlist?`);
    if (!ok) return;

    console.log("Remove from playlist", row.id);
    // Later:
    // await fetch(`/api/playlists/${playlistId}/videos/${row.id}`, { method: "DELETE" })
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 520 }}>
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
            {pagedRows.map((row) => {
              const hasInsight = Boolean(row.coreInsight && row.coreInsight.trim().length > 0);
              const hasTags = Array.isArray(row.tags) && row.tags.length > 0;

              return (
                <TableRow hover tabIndex={-1} key={row.id}>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Link href={row.url} target="_blank" rel="noreferrer" underline="hover">
                        <Typography variant="body2" fontWeight={600} noWrap>
                          {row.title}
                        </Typography>
                      </Link>
                      <Typography variant="caption" color="text.secondary">
                        {row.url}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.channel || "—"}</TableCell>
                  <TableCell>
                    <Stack spacing={1} alignItems="flex-start">
                      {hasTags ? (
                          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                            {row.tags.slice(0, 6).map((t) => (
                              <Chip key={t} label={t} size="small" />
                            ))}
                            {row.tags.length > 6 ? (
                              <Chip label={`+${row.tags.length - 6}`} size="small" />
                            ) : null}
                            <Tooltip title="Edit tags">
                            <IconButton
                              size="small"
                              onClick={() => openEditTags(row)}
                              sx={{
                                borderRadius: 2,
                                "&:hover": { bgcolor: "action.hover" },
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          </Stack>                          
                      ) : (
                        <>
                          <Button
                            size="small"
                            variant="text"
                            startIcon={<SellIcon />}
                            onClick={() => openEditTags(row)}
                            sx={{ textTransform: "none", alignSelf: "flex-start" }}
                          >
                            Add tags
                          </Button>
                        </>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Button
                        size="small"
                        variant={hasInsight ? "outlined" : "contained"}
                        startIcon={<EditNoteIcon />}
                        onClick={() => openCoreInsights(row)}
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
                  <TableCell align="right">{formatDate(row.addedAt)}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Remove from playlist">
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveFromPlaylist(row)}
                        sx={{
                          borderRadius: 2,
                          "&:hover": { bgcolor: "action.hover" },
                        }}
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
        count={rows.length}
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
        onSave={async ({ videoId, payload }) => {
          console.log("Save core insights", videoId, payload);
        }}
      />
      <EditVideoTagsModal
        open={editVideoTagsModalOpen}
        onClose={() => {
          setEditVideoTagsModalOpen(false);
          setActiveVideo(null);
        }}
        video={activeVideo}
        // allTags={tags} // pass your global tags list here (select-only modal)
        onSave={async ({ videoId, tags }) => {
          console.log("Save video tags", videoId, tags);
        }}
      />
    </Paper>
  );
}
