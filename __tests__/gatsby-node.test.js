/**
 * Tests for gatsby-node.ts
 *
 * Validates the onCreateBabelConfig Gatsby Node API hook which configures
 * Babel with the automatic React runtime.
 */

let onCreateBabelConfig

beforeEach(() => {
  jest.resetModules()
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ;({ onCreateBabelConfig } = require("../gatsby-node"))
})

describe("onCreateBabelConfig", () => {
  it("is exported as a named export", () => {
    expect(onCreateBabelConfig).toBeDefined()
    expect(typeof onCreateBabelConfig).toBe("function")
  })

  it("calls actions.setBabelPreset exactly once", () => {
    const mockSetBabelPreset = jest.fn()
    onCreateBabelConfig({ actions: { setBabelPreset: mockSetBabelPreset } })
    expect(mockSetBabelPreset).toHaveBeenCalledTimes(1)
  })

  it("sets the preset name to 'babel-preset-gatsby'", () => {
    const mockSetBabelPreset = jest.fn()
    onCreateBabelConfig({ actions: { setBabelPreset: mockSetBabelPreset } })
    const callArg = mockSetBabelPreset.mock.calls[0][0]
    expect(callArg.name).toBe("babel-preset-gatsby")
  })

  it("sets reactRuntime option to 'automatic'", () => {
    const mockSetBabelPreset = jest.fn()
    onCreateBabelConfig({ actions: { setBabelPreset: mockSetBabelPreset } })
    const callArg = mockSetBabelPreset.mock.calls[0][0]
    expect(callArg.options).toBeDefined()
    expect(callArg.options.reactRuntime).toBe("automatic")
  })

  it("passes a single object argument to setBabelPreset", () => {
    const mockSetBabelPreset = jest.fn()
    onCreateBabelConfig({ actions: { setBabelPreset: mockSetBabelPreset } })
    expect(mockSetBabelPreset).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "babel-preset-gatsby",
        options: expect.objectContaining({
          reactRuntime: "automatic",
        }),
      })
    )
  })

  it("does not throw when called with a valid actions object", () => {
    const mockSetBabelPreset = jest.fn()
    expect(() =>
      onCreateBabelConfig({ actions: { setBabelPreset: mockSetBabelPreset } })
    ).not.toThrow()
  })

  it("does not call any action other than setBabelPreset", () => {
    const actions = {
      setBabelPreset: jest.fn(),
      setBabelPlugin: jest.fn(),
      setBabelOptions: jest.fn(),
    }
    onCreateBabelConfig({ actions })
    expect(actions.setBabelPlugin).not.toHaveBeenCalled()
    expect(actions.setBabelOptions).not.toHaveBeenCalled()
  })

  it("options object has exactly one key: reactRuntime", () => {
    const mockSetBabelPreset = jest.fn()
    onCreateBabelConfig({ actions: { setBabelPreset: mockSetBabelPreset } })
    const { options } = mockSetBabelPreset.mock.calls[0][0]
    expect(Object.keys(options)).toEqual(["reactRuntime"])
  })
})