"use client";

import useWorkspace from "@/lib/swr/use-workspace";
import { UserProps } from "@/lib/types";
import {
  ArrowTurnRight2,
  Avatar,
  CopyButton,
  LinkLogo,
  TableContext,
  Tooltip,
} from "@dub/ui";
import { ArrowRight } from "@dub/ui/src/icons";
import { cn, formatDateTime, getApexDomain } from "@dub/utils";
import { formatDate } from "date-fns";
import { Mail } from "lucide-react";
import { useContext, useId } from "react";
import { ResponseLink } from "./links-container";

export function LinkTitleColumn({ link }: { link: ResponseLink }) {
  const { url, domain, user, createdAt } = link;
  const path = link.key === "_root" ? "" : `/${link.key}`;

  const { variant } = useContext(TableContext);

  const id = useId();

  return (
    <div className="flex items-center gap-3 transition-[padding] group-data-[variant=loose-list]/table:sm:py-2">
      <div className="relative flex items-center justify-center">
        {/* Link logo background circle */}
        <div className="absolute inset-0 shrink-0 rounded-full border border-gray-200 opacity-0 transition-opacity group-data-[variant=loose-list]/table:sm:opacity-100">
          <div className="h-full w-full rounded-full border border-white bg-gradient-to-t from-gray-100" />
        </div>
        <div className="relative transition-[padding] group-data-[variant=loose-list]/table:p-1 group-data-[variant=loose-list]/table:md:p-2">
          <LinkLogo
            apexDomain={getApexDomain(url)}
            className="h-4 w-4 shrink-0 transition-[width,height] sm:h-6 sm:w-6 group-data-[variant=loose-list]/table:sm:h-5 group-data-[variant=loose-list]/table:sm:w-5"
          />
        </div>
      </div>
      <div className="h-[24px] min-w-0 overflow-hidden transition-[height] group-data-[variant=loose-list]/table:h-[44px]">
        <div className="flex items-center gap-2">
          <span
            className="block truncate font-medium text-gray-950"
            title={`${domain}${path}`}
          >
            {domain + path}
          </span>
          <Details link={link} compact />
        </div>

        <div className="mt-1">
          <Details link={link} />
        </div>
      </div>
    </div>
  );
}

function Details({ link, compact }: { link: ResponseLink; compact?: boolean }) {
  const { url, user, createdAt } = link;
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-xs transition-opacity md:gap-3",
        compact
          ? "opacity-0 group-data-[variant=compact-list]/table:opacity-100"
          : "opacity-0 group-data-[variant=loose-list]/table:opacity-100",
      )}
    >
      <div className="flex min-w-0 items-center gap-1">
        {compact ? (
          <ArrowRight className="mr-1 h-3 w-3 text-gray-400" />
        ) : (
          <ArrowTurnRight2 className="h-3 w-3 text-gray-400" />
        )}
        <span
          className={cn("truncate", url ? "text-gray-500" : "text-gray-400")}
          title={url}
        >
          {url || "No URL configured"}
        </span>
      </div>
      <div className="hidden shrink-0 sm:block">
        <UserAvatar user={user} />
      </div>
      <div className="hidden sm:block">
        <Tooltip content={formatDateTime(createdAt)}>
          <span className="text-gray-400">
            {formatDate(createdAt, "MMM d")}
          </span>
        </Tooltip>
      </div>
    </div>
  );
}

function UserAvatar({ user }: { user: UserProps }) {
  const { slug } = useWorkspace();

  return (
    <Tooltip
      content={
        <div className="w-full p-3">
          <Avatar user={user} className="h-8 w-8" />
          <div className="mt-2 flex items-center gap-1.5">
            <p className="text-sm font-semibold text-gray-700">
              {user?.name || user?.email || "Anonymous User"}
            </p>
            {!slug && // this is only shown in admin mode (where there's no slug)
              user?.email && (
                <CopyButton
                  value={user.email}
                  icon={Mail}
                  className="[&>*]:h-3 [&>*]:w-3"
                />
              )}
          </div>
          {user?.name && user.email && (
            <p className="mt-1 text-xs text-gray-500">{user.email}</p>
          )}
        </div>
      }
    >
      <div>
        <Avatar user={user} className="h-4 w-4" />
      </div>
    </Tooltip>
  );
}
