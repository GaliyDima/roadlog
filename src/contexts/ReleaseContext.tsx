import React, { createContext, useCallback, useMemo, useState } from "react";
import { createRelease, getReleasesByProjectId } from "../api/release";

export interface IRelease {
  id: string;
  date: string;
  notes: string;
  tasks: any[];
  projectId: string;
}

export interface IReleaseContext {
  createNewRelease: (
    projectId: string,
    date: string,
    notes: string,
    tasks: string[]
  ) => Promise<void>;
  fetchReleases: (projectId: string) => Promise<void>;
  releases: IRelease[];
  loading: boolean;
}

export const ReleaseContext = createContext<IReleaseContext>({
  createNewRelease: () => Promise.resolve(),
  fetchReleases: () => Promise.resolve(),
  releases: [],
  loading: false,
});

export const ReleaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [releases, setReleases] = useState<IRelease[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReleases = useCallback(async (projectId: string) => {
    setLoading(true);
    const fetchedReleases = await getReleasesByProjectId(projectId);
    setReleases(fetchedReleases);
    setLoading(false);
  }, []);

  const createNewRelease = useCallback(
    async (projectId: string, date: string, notes: string, tasks: string[]) => {
      setLoading(true);
      await createRelease(projectId, date, notes, tasks);
      await fetchReleases(projectId);
      setLoading(false);
    },
    [fetchReleases]
  );

  const value: IReleaseContext = useMemo<IReleaseContext>(
    () => ({
      createNewRelease,
      fetchReleases,
      releases,
      loading,
    }),
    [createNewRelease, fetchReleases, releases, loading]
  );

  return (
    <ReleaseContext.Provider value={value}>{children}</ReleaseContext.Provider>
  );
};

export default ReleaseProvider;
