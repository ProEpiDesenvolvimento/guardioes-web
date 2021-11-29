import React from "react";
import { mount } from "enzyme";

import FormInput from "sharedComponents/FormInput";

describe("FormInput", () => {
  let wrapper;

  beforeEach(
    () =>
      (wrapper = mount(
        <FormInput label="" type="" value="" setValue={jest.fn()} disabled="" />
      ))
  );

  it("should render a div", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });

  it("renders the value of the label", () => {
    wrapper.setProps({ label: "Nome" });
    expect(wrapper.find("label").text()).toEqual("Nome");
  });

  it("renders the selected input type", () => {
    wrapper.setProps({ type: "text" });
    expect(wrapper.find("FormInput").props().type).toEqual("text");
  });

  it("renders the input value", () => {
    wrapper.setProps({ value: "Usuário" });
    expect(wrapper.find("FormInput").props().value).toEqual("Usuário");
  });

  it("has an onChange method", () => {
    expect(wrapper.props().setValue).toBeDefined();
  });
});
