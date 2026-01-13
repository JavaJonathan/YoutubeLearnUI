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

const columns = [
  { id: "title", label: "Video", minWidth: 260 },
  { id: "channel", label: "Channel", minWidth: 160 },
  { id: "tags", label: "Tags", minWidth: 220 },
  { id: "coreInsight", label: "Core Insight", minWidth: 320 },
  { id: "addedAt", label: "Added", minWidth: 120, align: "right" },
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
];

export default function PlaylistTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const pagedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
              return (
                <TableRow hover tabIndex={-1} key={row.id}>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Link
                        href={row.url}
                        target="_blank"
                        rel="noreferrer"
                        underline="hover"
                      >
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
                    {Array.isArray(row.tags) && row.tags.length > 0 ? (
                      <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        flexWrap="wrap"
                      >
                        {row.tags.slice(0, 6).map((t) => (
                          <Chip key={t} label={t} size="small" />
                        ))}
                        {row.tags.length > 6 ? (
                          <Chip
                            label={`+${row.tags.length - 6}`}
                            size="small"
                          />
                        ) : null}
                      </Stack>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {row.coreInsight || "—"}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{formatDate(row.addedAt)}</TableCell>
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
    </Paper>
  );
}
