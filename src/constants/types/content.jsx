type tDownloads = {
  is_annotated: boolean;
  update_frequency: string;
};

type tFormat = {
  is_annotated: boolean;
  original_format: {
    link: string;
    name: string;
  };
};

export type tContent = {
  about: Array<string>;
  disclaimer: Array<string>;
  downloads: tDownloads;
  format_description: tFormat;
  organization_description: Array<string>;
  properties: Object;
  responsible_use: Array<string>;
  type: 'object';
};
