import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Skeleton,
} from "@mui/material";

const LoadingPostSkeleton = () => {
  const skeletons = [1, 2, 3];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { sm: "87%" },
      }}
      mt={4}
    >
      <Grid
        container
        spacing={{ xs: 3, sm: 2 }}
        columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
      >
        {skeletons.map((skeleton) => (
          <Grid item key={skeleton}>
            <Card
              sx={{
                width: 320,
                height: 400,
                m: 2,
                border: "1px solid rgba(31, 110, 140, 0.2)",
                boxShadow: "-10px 15px 8px rgba(31, 110, 140, 0.2)",
              }}
            >
              <CardContent
                sx={{
                  p: "10px 12px",
                }}
              >
                <>
                  <Skeleton
                    sx={{ height: 250 }}
                    animation="wave"
                    variant="rectangular"
                  />
                  <Skeleton height={20} width="80%" style={{ marginTop: 6 }} />
                </>
              </CardContent>
              <CardHeader
                sx={{ mt: "0" }}
                avatar={<Skeleton variant="circular" width={30} height={30} />}
                title={
                  <Skeleton
                    height={10}
                    width="50%"
                    style={{ marginBottom: 1 }}
                  />
                }
                subheader={<Skeleton height={10} width="30%" />}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LoadingPostSkeleton;
