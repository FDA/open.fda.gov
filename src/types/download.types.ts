
export type DownloadProps = {
  allPartitions: Array<Object>;
  k: number;
  api_path: string;
  title: string;
  results: Object;
  showAllResults: boolean;
  toggle: Function;
  updated: string;
  meta?: any
};

export interface DownloadsMenuProps {
  bottomPos: number;
  content: (string | Object)[];
  isBottom: boolean;
  isFixed?: boolean;
}

export type DownloadsContainerState = {
  data: Object | null | undefined;
  showAllResults: boolean;
};


export interface DownloadResult {
  size_mb: number;
  display_name: string;
  [key: string]: any;
}

export interface DownloadResults {
  partitions: Array<DownloadResult>;
  [key: string]: any;
}

export interface WithMetaProps {
  meta: {
    api_path: string;
    title: string;
    [key: string]: any;
  };
  k?: any;
  api_path?: string;
  title?: string;
  allPartitions?: Array<DownloadResult>;
  results?: Record<string, DownloadResult[]>;
  showAllResults?: boolean;
  toggle?: () => void;
  updated?: string;
}

export interface MetaData {
  last_updated: string;
  [key: string]: any;
}

export type FileDownloadProps = {
  k: string | number;
  meta: {
    status: string;
    [key: string]: any;
  };
};
