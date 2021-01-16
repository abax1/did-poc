import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./CreateBA.css";
import {
  FormGroup,
  Intent,
  Menu,
  InputGroup,
  Position,
  Popover,
  Button,
  RadioGroup,
  Radio,
  Divider,
  H1,
  Tag,
  Card,
  Slider,
  NumericInput,
  Alert,
} from "@blueprintjs/core";
import SelectTADIG from "../../components/SelectTADIG/SelectTADIG";
import VRSDatePicker from "../../components/DatePicker/DatePicker";
import { TimeZonePicker } from "../../components/TimeZonePicker/TimeZonePicker";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import FadeIn from "../../components/Transitions/FadeIn";
import { getMe } from "../../actions/peersActionCreators";
import { createBilateralAgreement } from "../../actions/actionCreators";
import { AppToaster } from "../../components/AppToaster/AppToaster";
import {
  MAX_RECONCILIATION_HOURS,
  MIN_RECONCILIATION_HOURS,
  TIMEZONE,
  CURRENCY_CODES,
} from "../../constants";
import SelectOperator from "../../components/SelectOperator/SelectOperator";
import MultiSelectTadig from "../../components/MultiSelectTadig/MultiSelectTadig";
import UsageTolerance from "../../components/UsageThreshold/UsageThreshold";

const InvoicePeriodMenu = ({ setPeriod }) => {
  return (
    <Menu>
      <Menu.Item text="Day" onClick={() => setPeriod("DAY")} />
      <Menu.Item text="Month" onClick={() => setPeriod("MONTH")} />
      <Menu.Item text="2 Months" onClick={() => setPeriod("TWO_MONTHS")} />
      <Menu.Item text="3 Months" onClick={() => setPeriod("THREE_MONTHS")} />
      <Menu.Item text="4 Months" onClick={() => setPeriod("FOUR_MONTHS")} />
      <Menu.Item text="5 Months" onClick={() => setPeriod("FIVE_MONTHS")} />
      <Menu.Item text="6 Months" onClick={() => setPeriod("SIX_MONTHS")} />
      <Menu.Item text="7 Months" onClick={() => setPeriod("SEVEN_MONTHS")} />
      <Menu.Item text="8 Months" onClick={() => setPeriod("EIGHT_MONTHS")} />
      <Menu.Item text="9 Months" onClick={() => setPeriod("NINE_MONTHS")} />
      <Menu.Item text="10 Months" onClick={() => setPeriod("TEN_MONTHS")} />
      <Menu.Item text="11 Months" onClick={() => setPeriod("ELEVEN_MONTHS")} />
      <Menu.Item text="12 Months" onClick={() => setPeriod("TWELVE_MONTHS")} />
    </Menu>
  );
};

const ServiceNameMenu = ({ setName }) => {
  return (
    <Menu>
      <Menu.Item text="NB-IoT" onClick={() => setName("NB-IoT")} />
    </Menu>
  );
};

const ServiceGroupMenu = ({ setGroup }) => {
  return (
    <Menu>
      <Menu.Item
        text="Data - Volume"
        onClick={() => setGroup("Data - Volume")}
      />
      <Menu.Item
        text="Event - Counting"
        onClick={() => setGroup("Event - Counting")}
      />
    </Menu>
  );
};

const IoTCurrencyMenu = ({ setCurrency }) => {
  return (
    <Menu>
      {CURRENCY_CODES.map((currency_code) => {
        return (
          <Menu.Item
            text={currency_code}
            onClick={() => setCurrency(currency_code)}
          />
        );
      })}
    </Menu>
  );
};

const convertPeriod = (period) => {
  switch (period) {
    case "DAY":
      return "Day";
    case "MONTH":
      return "Month";
    case "TWO_MONTHS":
      return "2 Months";
    case "THREE_MONTHS":
      return "3 Months";
    case "FOUR_MONTHS":
      return "4 Months";
    case "FIVE_MONTHS":
      return "5 Months";
    case "SIX_MONTHS":
      return "6 Months";
    case "SEVEN_MONTHS":
      return "7 Months";
    case "EIGHT_MONTHS":
      return "8 Months";
    case "NINE_MONTHS":
      return "9 Months";
    case "TEN_MONTHS":
      return "10 Months";
    case "ELEVEN_MONTHS":
      return "11 Months";
    case "TWELVE_MONTHS":
      return "12 Months";
    default:
    case "DAY":
      return "Day";
  }
};

const displayToaster = (intent, message) => {
  AppToaster.show({
    icon: intent === "danger" ? "error" : "info-sign",
    message: message,
    intent: intent,
  });
};

function CreateBAForm({
  params,
  setParams,
  myIdentity,
  getMe,
  theme,
  submitCreate,
  showTitle,
  data,
  updateCallback,
}) {
  const [alertProps, setAlertProps] = useState({
    isOpen: false,
    isLoading: false,
    data: {},
  });
  const [hpmn, setHpmn] = useState("");
  const [name, setName] = useState("");
  const [partnerTadigGroup, setPartnerTadigGroup] = useState(null);
  const [operatorTadigGroup, setOperatorTadigGroup] = useState(null);
  const [vpmnIntent, setVpmnIntent] = useState(Intent.NONE);
  const [hpmnIntent, setHpmnIntent] = useState(Intent.NONE);
  const [dateRangeCheck, setDateRangeCheck] = useState(Intent.NONE);
  const [invoicePeriod, setInvoicePeriod] = useState("MONTH");
  const [aggregationPeriod, setAggregationPeriod] = useState("MONTH");
  const [udrMech, setUdrMech] = useState("LOWEST_UDR");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [serviceName, setServiceName] = useState("NB-IoT");
  const [serviceGroup, setServiceGroup] = useState("Data - Volume");
  const [iotCurrency, setIotCurrency] = useState("EUR");
  const [timezone, setTimezone] = useState("Europe/London");
  const [tolerance, setTolerance] = useState(0.02);
  const [accessRate, setAccessRate] = useState(0.0002);
  const [usageRate, setUsageRate] = useState(0.0006);
  const [usageRateAbove, setUsageRateAbove] = useState(0.0006);
  const [usageAmberThreshold, setUsageAmberThreshold] = useState(0.2);
  const [usageRedThreshold, setUsageRedThreshold] = useState(0.35);
  const [usageRateThreshold, setUsageRateThreshold] = useState(0.0006);
  const [reconciliationHours, setReconciliationHours] = useState(672);
  const [editAgreementId, setEditAgreementId] = useState("");

  const setData = (dataIn) => {
    console.log("dataIn", dataIn);
    if (dataIn !== null) {
      setName(dataIn.name);
      // let tadigGroup = [
      //   ...dataIn.my_operator_tadig_group.map((item)=>{
      //     return {
      //       country_code: "",
      //       country_name: "",
      //       mcc: 0,
      //       mnc: 0,
      //       mobile_network_name: "",
      //       operator_name: "",
      //       tadig: item,
      //       x500: ""
      //     }
      //   })
      // ]
      // console.log("tadigGroup: ", tadigGroup)

      setOperatorTadigGroup([
        ...dataIn.my_operator_tadig_group.map((item) => {
          return {
            country_code: "",
            country_name: "",
            mcc: 0,
            mnc: 0,
            mobile_network_name: "",
            operator_name: "",
            tadig: item,
            x500: "",
          };
        }),
      ]);
      setPartnerTadigGroup([
        ...dataIn.my_partner_tadig_group.map((item) => {
          return {
            country_code: "",
            country_name: "",
            mcc: 0,
            mnc: 0,
            mobile_network_name: "",
            operator_name: "",
            tadig: item,
            x500: "",
          };
        }),
      ]);
    }
    setInvoicePeriod(dataIn.invoice_period);
    setAggregationPeriod(dataIn.aggregation_time_period);
    setUdrMech(dataIn.udr_reconciliation_mechanism);
    let startDate = new Date(dataIn.valid_from.toString().split("T")[0]);
    let endDate = new Date(dataIn.valid_to.toString().split("T")[0]);
    console.log("startDate: ", startDate);
    console.log("SPLIT DATE: ", dataIn.valid_from.toString().split("T"));
    setStartDate(startDate);
    setEndDate(endDate);
    setServiceName(dataIn.service_name);
    setServiceGroup(dataIn.service_group);
    setIotCurrency(dataIn.iot_currency);
    setTolerance(dataIn.tolerance);
    setAccessRate(dataIn.access_rate);
    setUsageRate(dataIn.usage_rate);
    setUsageRateThreshold(dataIn.usage_rate_threshold);
    setUsageRateAbove(dataIn.usage_rate_above_threshold);
    setReconciliationHours(dataIn.reconciliation_frequency_hours);
    setEditAgreementId(dataIn.linear_id);
    setValidation({
      hpmn: true,
      name: true,
      timezone: true,
      service_name: true,
      service_group: true,
      aggregation_time_period: true,
      invoice_period: true,
      valid_from: true,
      valid_to: true,
      tolerance: true,
      access_rate: true,
      usage_rate: true,
      usage_rate_above: true,
      usage_rate_threshold: true,
      reconciliation_frequency_hours: true,
      iot_currency: true,
      udr_reconciliation_mechanism: true,
    });
  };

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    if (data != null) {
      setData(data);
    }
  }, [data]);

  // Set all the mandatory fields here so that we can only enable button when set.
  const [validation, setValidation] = useState({
    hpmn: false,
    name: false,
    timezone: true,
    service_name: true,
    service_group: true,
    aggregation_time_period: true,
    invoice_period: true,
    valid_from: false,
    valid_to: false,
    tolerance: true,
    access_rate: true,
    usage_rate: true,
    usage_rate_above: true,
    usage_rate_threshold: true,
    amber_limit: true,
    red_limit: true,
    reconciliation_frequency_hours: true,
    iot_currency: true,
    udr_reconciliation_mechanism: true,
  });

  const checkEnableButton = () => {
    if (Object.values(validation).indexOf(false) > -1) {
      return true;
    } else {
      return false;
    }
  };

  const createCallback = (data) => {
    console.log("callback: ", data);
    setAlertProps({ ...alertProps, isOpen: false, isLoading: false });
    if (updateCallback !== null) {
      updateCallback();
    }
  };

  const createBilateralAgreement = () => {
    const parameters = {
      target_node: hpmn.x500,
      name: name,
      vpmn: myIdentity.host.TADIG,
      hpmn: "",
      my_operator_tadig_group: operatorTadigGroup.map((item) => {
        return item.tadig;
      }),
      my_partner_tadig_group: partnerTadigGroup.map((item) => {
        return item.tadig;
      }),
      timezone: TIMEZONE,
      service_name: serviceName,
      service_group: serviceGroup,
      aggregation_time_period: aggregationPeriod,
      invoice_period: invoicePeriod,
      valid_from: startDate.toJSON(),
      valid_to: endDate.toJSON(),
      tolerance: tolerance.toFixed(2),
      access_rate: accessRate.toFixed(4),
      usage_rate: usageRate.toFixed(4),
      usage_rate_above_threshold: usageRateAbove.toFixed(4),
      usage_rate_threshold: usageRateThreshold.toFixed(4),
      usage_amber_threshold: usageAmberThreshold.toFixed(2),
      usage_red_threshold: usageRedThreshold.toFixed(2),
      reconciliation_frequency_hours: reconciliationHours,
      iot_currency: iotCurrency,
      udr_reconciliation_mechanism: udrMech,
      edit_agreement_id: editAgreementId,
    };
    setAlertProps({ ...alertProps, isOpen: true, data: { ...parameters } });
    console.log(parameters);
  };

  const handleKeyDown = (e) => {
    console.log(e.keyCode);
    if (e.keyCode == 69 || e.keyCode == 189 /* '-' key */) {
      // ignore the keystroke
      e.preventDefault();
    }
  };

  return (
    <>
      <FadeIn disabled={!showTitle}>
        <div
          className={
            showTitle === true ? "create-ba-form" : "create-ba-form-edit"
          }
        >
          {showTitle && (
            <div className="ba-title">
              <H1>Create Bilateral Agreement</H1>
              <p>
                This page will allow you to create a bilateral agreement in{" "}
                <Tag>DRAFT</Tag> state.
              </p>
            </div>
          )}
          <Card
            className={
              showTitle === true
                ? "create-ba-container"
                : "create-ba-container-edit"
            }
            elevation={2}
          >
            <FormGroup
              className="ba-select-operator"
              intent={hpmnIntent}
              helperText={
                hpmnIntent === Intent.NONE
                  ? "Select a Partner Operator."
                  : "HPMN cannot be the same as VPMN. Please select a different HPMN"
              }
              label="Partner Operator"
              labelInfo="(required)"
            >
              <SelectOperator
                disabled={alertProps.isLoading}
                intent={hpmnIntent}
                setTadig={(hpmnIn) => {
                  setHpmn(hpmnIn);
                  setHpmnIntent(Intent.NONE);
                  setValidation({ ...validation, hpmn: true });
                }}
              />
            </FormGroup>
            <FormGroup
              className="ba-operator-tadigs"
              intent={hpmnIntent}
              helperText="Select a Your Operator TADIGs."
              label="My Operator TADIG group"
              labelInfo="(required)"
            >
              <MultiSelectTadig
                disabled={alertProps.isLoading}
                intent={hpmnIntent}
                prePopData={operatorTadigGroup}
                setTadig={(tadigGroup) => {
                  console.log("MY OPERATOR TADIG GROUP: ", tadigGroup);
                  setOperatorTadigGroup(tadigGroup);
                  setHpmnIntent(Intent.NONE);
                  setValidation({ ...validation, hpmn: true });
                }}
              />
            </FormGroup>
            <FormGroup
              className="ba-partner-tadigs"
              intent={hpmnIntent}
              helperText="Select a Your Partner TADIGs."
              label="My Partner TADIG group"
              labelInfo="(required)"
            >
              <MultiSelectTadig
                disabled={alertProps.isLoading}
                intent={hpmnIntent}
                prePopData={partnerTadigGroup}
                setTadig={(tadigGroup) => {
                  console.log("MY PARTNER TADIG GROUP: ", tadigGroup);
                  setPartnerTadigGroup(tadigGroup);
                  setHpmnIntent(Intent.NONE);
                  setValidation({ ...validation, hpmn: true });
                }}
              />
            </FormGroup>
            <FormGroup
              className="ba-name"
              label="Name"
              helperText="Enter a user friendly name for the agreement."
              labelInfo="(required)"
            >
              <InputGroup
                disabled={alertProps.isLoading}
                placeholder="Enter a name for the agreement..."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setValidation({ ...validation, name: e.target.value != "" });
                }}
              />
            </FormGroup>

            <FormGroup
              className="ba-servicename"
              helperText="Select service name"
              label="Service Name"
              labelInfo="(required)"
            >
              <InputGroup
                disabled={alertProps.isLoading}
                placeholder="Select service name..."
                value={serviceName}
                readOnly
                rightElement={
                  <Popover
                    position={Position.LEFT_BOTTOM}
                    content={<ServiceNameMenu setName={setServiceName} />}
                  >
                    <Button text="Select" />
                  </Popover>
                }
              />
            </FormGroup>

            <FormGroup
              className="ba-service-group"
              helperText="Select service group"
              label="Service Group"
              labelInfo="(required)"
            >
              <InputGroup
                disabled={alertProps.isLoading}
                placeholder="Select service group..."
                value={serviceGroup}
                readOnly
                rightElement={
                  <Popover
                    position={Position.LEFT_BOTTOM}
                    content={<ServiceGroupMenu setGroup={setServiceGroup} />}
                  >
                    <Button text="Select" />
                  </Popover>
                }
              />
            </FormGroup>
            <FormGroup
              className="ba-agg-period"
              helperText="Select aggregation time dimension."
              label="Aggregation Time Period"
              labelInfo="(required)"
            >
              <InputGroup
                disabled={alertProps.isLoading}
                placeholder="Select aggregation time period..."
                value={convertPeriod(aggregationPeriod)}
                readOnly
                rightElement={
                  <Popover
                    position={Position.LEFT_BOTTOM}
                    content={
                      <InvoicePeriodMenu setPeriod={setAggregationPeriod} />
                    }
                  >
                    <Button text="Select" />
                  </Popover>
                }
              />
            </FormGroup>
            <FormGroup
              className="ba-inv-period"
              helperText="Select invoice period"
              label="Invoice Period"
              labelInfo="(required)"
            >
              <InputGroup
                disabled={alertProps.isLoading}
                placeholder="Select invoice period..."
                value={convertPeriod(invoicePeriod)}
                readOnly
                rightElement={
                  <Popover
                    position={Position.LEFT_BOTTOM}
                    content={<InvoicePeriodMenu setPeriod={setInvoicePeriod} />}
                  >
                    <Button text="Select" />
                  </Popover>
                }
              />
            </FormGroup>
            <FormGroup
              className="ba-reconciliation-hours"
              helperText="Select reconciliation hours"
              label="Reconciliation Period"
              labelInfo="(required)"
            >
              <NumericInput
                min={MIN_RECONCILIATION_HOURS}
                max={MAX_RECONCILIATION_HOURS}
                disabled={alertProps.isLoading}
                allowNumericCharactersOnly={true}
                onKeyDown={handleKeyDown}
                placeholder="Select reconciliation period..."
                value={reconciliationHours}
                onValueChange={(val, strVal) => {
                  console.log(val, strVal, reconciliationHours);
                  setReconciliationHours(isNaN(strVal) ? 0 : val);
                }}
                leftIcon="time"
              />
            </FormGroup>
            <FormGroup
              className="ba-iot-currency"
              helperText="Select IoT currency"
              label="IOT Currency"
              labelInfo="(required)"
            >
              <InputGroup
                disabled={alertProps.isLoading}
                placeholder="Select IoT currency..."
                value={iotCurrency}
                readOnly
                rightElement={
                  <Popover
                    position={Position.LEFT_BOTTOM}
                    content={<IoTCurrencyMenu setCurrency={setIotCurrency} />}
                  >
                    <Button text="Select" />
                  </Popover>
                }
              />
            </FormGroup>
            <FormGroup
              className="ba-udr-mech"
              helperText="Select UDR reconciliation mechanism that will be used when there is a missmatch."
              label="UDR Reconciliation Mechanism"
              labelInfo="(required)"
            >
              <RadioGroup
                disabled={alertProps.isLoading}
                onChange={(value) => setUdrMech(value.target.value)}
                selectedValue={udrMech}
                inline
              >
                <Radio label="Lowest UDR" value="LOWEST_UDR" />
                <Radio label="Serving UDR" value="SERVING_UDR" />
                <Radio label="Home UDR" value="HOME_UDR" />
                <Radio label="Median UDR" value="MEDIAN_UDR" />
              </RadioGroup>
            </FormGroup>
            <div className="ba-dates-from">
              <FormGroup
                helperText={
                  dateRangeCheck === Intent.NONE
                    ? "Select the date that this agreement will apply from."
                    : "Start cannot be equal to or greater than end date."
                }
                label="Valid from"
                labelInfo="(required)"
                intent={dateRangeCheck}
              >
                <VRSDatePicker
                  disabled={alertProps.isLoading}
                  max={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() + 10)
                    )
                  }
                  intent={dateRangeCheck}
                  value={startDate}
                  setDate={(date) => {
                    console.log(date);
                    setStartDate(date);
                    if (date >= endDate) {
                      setDateRangeCheck(Intent.DANGER);
                    } else {
                      setDateRangeCheck(Intent.NONE);
                      setValidation({ ...validation, valid_from: true });
                    }
                  }}
                />
              </FormGroup>
            </div>
            <div className="ba-dates-to">
              <FormGroup
                helperText={
                  dateRangeCheck === Intent.NONE
                    ? "Select the date that this agreement will apply to."
                    : "Start cannot be equal to or greater than end date."
                }
                label="Valid to"
                labelInfo="(required)"
                intent={dateRangeCheck}
              >
                <VRSDatePicker
                  disabled={alertProps.isLoading}
                  max={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() + 10)
                    )
                  }
                  intent={dateRangeCheck}
                  value={endDate}
                  setDate={(date) => {
                    setEndDate(date);
                    if (startDate >= date) {
                      setDateRangeCheck(Intent.DANGER);
                    } else {
                      setDateRangeCheck(Intent.NONE);
                      setValidation({ ...validation, valid_to: true });
                    }
                  }}
                />
              </FormGroup>
            </div>

            <FormGroup
              className="ba-tolerance"
              helperText={
                <small>
                  Select reconciliation tolerance. Hold <Tag small>Alt</Tag> for
                  minor increments.
                </small>
              }
              label="Tolerance"
              labelInfo="(required)"
            >
              <NumericInput
                min={0}
                max={100}
                minorStepSize={0.01}
                stepSize={1}
                disabled={alertProps.isLoading}
                placeholder="Set tolerance..."
                value={tolerance > 100 ? 100 : tolerance}
                onKeyDown={handleKeyDown}
                onValueChange={(val) => {
                  console.log(val);
                  if (val <= 100) {
                    setTolerance(val);
                  }
                }}
                leftIcon="percentage"
              />
            </FormGroup>
            <div className="ba-tolerance-multi">
              <UsageTolerance 
                amberVal={usageAmberThreshold} 
                amberOnChange={setUsageAmberThreshold}
                redVal={usageRedThreshold} 
                redOnChange={setUsageRedThreshold}
                disabled={alertProps.isLoading}
              />
            </div>
            <FormGroup
              className="ba-access-rate"
              helperText="Select fixed fee per IMSI."
              label="Access Rate Charge"
              labelInfo="(required)"
            >
              <NumericInput
                min={0}
                max={100}
                minorStepSize={0.001}
                allowNumericCharactersOnly
                stepSize={0.01}
                onKeyDown={handleKeyDown}
                disabled={alertProps.isLoading}
                placeholder="Set access rate charge..."
                value={accessRate}
                onValueChange={setAccessRate}
              />
            </FormGroup>
            <FormGroup
              className="ba-usage-rate"
              helperText="Select usage rate to apply below threshold."
              label="Usage Rate Charge Below"
              labelInfo="(required)"
            >
              <NumericInput
                min={0}
                max={100}
                minorStepSize={0.001}
                allowNumericCharactersOnly
                stepSize={0.01}
                onKeyDown={handleKeyDown}
                disabled={alertProps.isLoading}
                placeholder="Set usage rate charge..."
                value={usageRate}
                onValueChange={setUsageRate}
              />
            </FormGroup>
            <FormGroup
              className="ba-usage-rate-above"
              helperText="Select usage rate to apply to threshold and above."
              label="Usage Rate Charge Above"
              labelInfo="(required)"
            >
              <NumericInput
                min={0}
                max={100}
                minorStepSize={0.001}
                allowNumericCharactersOnly
                stepSize={0.01}
                onKeyDown={handleKeyDown}
                disabled={alertProps.isLoading}
                placeholder="Set usage rate charge..."
                value={usageRateAbove}
                onValueChange={setUsageRateAbove}
              />
            </FormGroup>
            <FormGroup
              className="ba-usage-threshold"
              helperText="Select usage threshold in MB."
              label="Usage Rate Threshold (MB)"
              labelInfo="(required)"
            >
              <NumericInput
                min={0}
                max={100}
                minorStepSize={0.001}
                allowNumericCharactersOnly
                stepSize={0.01}
                onKeyDown={handleKeyDown}
                disabled={alertProps.isLoading}
                placeholder="Set usage rate threshold..."
                value={usageRateThreshold}
                onValueChange={setUsageRateThreshold}
              />
            </FormGroup>
            <Button
              className="ba-button"
              intent="danger"
              loading={alertProps.isLoading}
              disabled={checkEnableButton()}
              onClick={createBilateralAgreement}
            >
              Create Draft
            </Button>
          </Card>
        </div>
      </FadeIn>
      <Alert
        className={theme}
        cancelButtonText="Cancel"
        confirmButtonText="Create Agreement"
        icon="error"
        intent={Intent.DANGER}
        isOpen={alertProps.isOpen}
        onCancel={() => setAlertProps({ ...alertProps, isOpen: false })}
        onConfirm={() => {
          setAlertProps({ ...alertProps, isOpen: false, isLoading: true });
          submitCreate(createCallback, displayToaster, alertProps.data);
        }}
      >
        <p>
          Are you sure you want to create the agreement?
          <br />
          <br />
          When the agreement has been created, it will be in <Tag>
            DRAFT
          </Tag>{" "}
          state. It can be edited later if needed.
        </p>
      </Alert>
    </>
  );
}

const renderTolerance = (val) => {
  return `${val.toFixed(2)}%`;
};

const renderRates = (val) => {
  return `${val.toFixed(4)}`;
};

CreateBAForm.defaultProps = {
  params: {
    vpmn: "",
    hpmn: "",
  },
  showTitle: true,
  updateCallback: null,
};

const mapStateToProps = (state) => {
  return {
    myIdentity: state.peersReducer.me,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMe: () => getMe(dispatch),
    submitCreate: (callback, displayToast, params) =>
      createBilateralAgreement(callback, displayToast, params),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBAForm);
