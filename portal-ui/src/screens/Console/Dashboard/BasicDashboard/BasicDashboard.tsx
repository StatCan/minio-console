// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React, { Fragment } from "react";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Usage } from "../types";
import { niceBytes, niceDays } from "../../../../common/utils";
import DnsIcon from "@material-ui/icons/Dns";
import EgressIcon from "../../../../icons/EgressIcon";
import TableWrapper from "../../Common/TableWrapper/TableWrapper";
import ReportedUsageIcon from "../../../../icons/ReportedUsageIcon";
import { BucketsIcon } from "../../../../icons";
import { useTranslation } from "react-i18next";

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
      border: "#eaedee 1px solid",
      borderRadius: 5,
      boxShadow: "none",
    },
    fixedHeight: {
      height: 165,
      minWidth: 247,
      marginRight: 20,
      padding: "25px 28px",
      "& svg": {
        maxHeight: 18,
      },
    },
    consumptionValue: {
      color: "#000000",
      fontSize: "60px",
      fontWeight: "bold",
    },
    icon: {
      marginRight: 10,
      color: "#777777",
    },
    notationContainer: {
      display: "flex",
      flexWrap: "wrap",
    },
    dashboardBG: {
      width: 390,
      height: 255,
      zIndex: 500,
      position: "absolute",
      backgroundSize: "fill",
      backgroundImage: "url(/images/BG_IllustrationDarker.svg)",
      backgroundPosition: "right bottom",
      right: 0,
      bottom: 0,
      backgroundRepeat: "no-repeat",
    },
    dashboardContainer: {
      zIndex: 600,
      position: "absolute",
    },
    elementTitle: {
      fontWeight: 500,
      color: "#777777",
      fontSize: 14,
      marginTop: -9,
    },
    smallUnit: {
      fontSize: 20,
    },
  });

interface IDashboardProps {
  classes: any;
  usage: Usage | null;
}

const BasicDashboard = ({ classes, usage }: IDashboardProps) => {
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { t } = useTranslation("dashboard");

  const prettyUsage = (usage: string | undefined) => {
    if (usage === undefined) {
      return "0";
    }

    const niceBytesUsage = niceBytes(usage).split(" ");

    if (niceBytesUsage.length !== 2) {
      return niceBytesUsage.join(" ");
    }

    return (
      <Fragment>
        {niceBytesUsage[0]}
        <span className={classes.smallUnit}>{niceBytesUsage[1]}</span>
      </Fragment>
    );
  };

  const prettyNumber = (usage: number | undefined) => {
    if (usage === undefined) {
      return 0;
    }

    return usage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const serverColumns = [
    {
      label: t("endpoint"),
      elementKey: "endpoint",
    },
    {
      label: t("status"),
      elementKey: "state",
    },
    {
      label: t("uptime"),
      elementKey: "uptime",
    },
    {
      label: t("version"),
      elementKey: "version",
    },
  ];

  const makeServerArray = (usage: Usage | null) => {
    if (usage != null) {
      usage.servers.forEach((s) => (s.uptime = niceDays(s.uptime)));
      return usage.servers.sort(function (a, b) {
        var nameA = a.endpoint.toUpperCase();
        var nameB = b.endpoint.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else return [];
  };

  const serverArray = makeServerArray(usage);

  return (
    <Fragment>
      <div className={classes.dashboardBG} />
      <Grid container className={classes.dashboardContainer}>
        <Grid container spacing={3} className={classes.container}>
          <Grid item className={classes.notationContainer}>
            <Paper className={fixedHeightPaper}>
              <Grid container direction="row" alignItems="center">
                <Grid item className={classes.icon}>
                  <BucketsIcon />
                </Grid>
                <Grid item>
                  <Typography className={classes.elementTitle}>
                    {t("allBuckets")}
                  </Typography>
                </Grid>
              </Grid>
              <Typography className={classes.consumptionValue}>
                {usage ? prettyNumber(usage.buckets) : 0}
              </Typography>
            </Paper>
            <Paper className={fixedHeightPaper}>
              <Grid container direction="row" alignItems="center">
                <Grid item className={classes.icon}>
                  <ReportedUsageIcon />
                </Grid>
                <Grid item>
                  <Typography className={classes.elementTitle}>
                    {t("usage")}
                  </Typography>
                </Grid>
              </Grid>
              <Typography className={classes.consumptionValue}>
                {usage ? prettyUsage(usage.usage + "") : 0}
              </Typography>
            </Paper>
            <Paper className={fixedHeightPaper}>
              <Grid container direction="row" alignItems="center">
                <Grid item className={classes.icon}>
                  <EgressIcon />
                </Grid>
                <Grid item>
                  <Typography className={classes.elementTitle}>
                    {" "}
                    {t("totalObjects")}
                  </Typography>
                </Grid>
              </Grid>
              <Typography className={classes.consumptionValue}>
                {usage ? prettyNumber(usage.objects) : 0}
              </Typography>
            </Paper>
            <Grid container direction="row" alignItems="center">
              <Grid item className={classes.icon}>
                <DnsIcon />
              </Grid>
              <Grid item>
                <Typography className={classes.elementTitle}>
                  {" "}
                  {t("servers")}
                </Typography>
              </Grid>
              <TableWrapper
                columns={serverColumns}
                isLoading={false}
                records={serverArray}
                entityName={t("servers")}
                idField="endpoint"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(BasicDashboard);
