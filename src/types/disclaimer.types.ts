
export type DisclaimerContainerState = {
  showModal: boolean;
};

export type HOCProps = {
  validated: boolean;
};

export type DisclaimerProps = {
  showModal: boolean,
  setIsModal: (val: boolean) => void;
  validated: boolean
};