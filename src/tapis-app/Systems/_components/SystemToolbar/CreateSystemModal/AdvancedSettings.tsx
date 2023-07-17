import { Form } from 'formik';
import { FormikInput } from 'tapis-ui/_common';
import { FormikSelect } from 'tapis-ui/_common/FieldWrapperFormik';
import {
  RuntimeTypeEnum,
} from '@tapis/tapis-typescript-systems';
import BatchSettings from './BatchSettings';
import ProxySettings from './ProxySettings';

const runtimeTypes = Object.values(RuntimeTypeEnum);

type AdvancedSettingsProp = {
  simplified: boolean;
};

const AdvancedSettings: React.FC<AdvancedSettingsProp> = ({ simplified }) => {

  if (simplified) {
    return (
      <Form style={{ paddingTop: '25px' }}>
        Advanced Settings
        <FormikInput
          name="rootDir"
          label="Root Directory"
          required={false}
          description={`Root directory`}
          aria-label="Input"
        />
        <FormikInput
          name="jobWorkingDir"
          label="Job Working Directory"
          required={false}
          description={`Job working directory`}
          aria-label="Input"
        />
        <FormikSelect
          name="jobRuntimes"
          description="The job runtime type for the system"
          label="Job Runtimes"
          required={false}
          data-testid="jobRuntimes"
        >
          <option disabled value="">
            Select a job runtime
          </option>
          {runtimeTypes.map((values) => {
            return <option>{values}</option>;
          })}
        </FormikSelect>
        <FormikInput
          name="effectiveUserId"
          label="Effective User ID"
          required={false}
          description={`Effective user id`}
          aria-label="Input"
        />
        <BatchSettings />
        <ProxySettings />
      </Form>
    );
  } else {
    return null;
  }
};

export default AdvancedSettings;
