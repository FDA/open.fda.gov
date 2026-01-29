export type NounName = 'animalandveterinary' | 'food' | 'device' | 'drug' | 'other' | 'tobacco' | 'transparency' | 'cosmetic';

export type EndpointName =
    | 'event'
    | 'enforcement'
    | 'classification'
    | '510k'
    | 'pma'
    | 'registrationlisting'
    | 'recall'
    | 'udi'
    | 'covid19serology'
    | 'label'
    | 'ndc'
    | 'drugsfda'
    | 'drugshortages'
    | 'historicaldocument'
    | 'nsde'
    | 'substance'
    | 'unii'
    | 'problem'
    | 'crl'
    | 'completeresponseletters';

export type endpointBoxProps = {
    noun_name: NounName,
    endpoint_name: EndpointName
};

export type EndpointStatusData = {
  last_updated: string;
  status: string;
  documents: number;
} | Record<string, any> | null;

export type endpointStatusProps = {
  data: EndpointStatusData | null;
  fullPath: string;
};

export type endpointStatusContainerProps = {
  endpoint: string;
  path: string;
  status: string;
  fullPath: string;
  data: Object | null;
  className?: string;
  style?: Object;
  [key: string]: any;
};

export type endpointStatusContainerState = {
  data: Object | null;
};
