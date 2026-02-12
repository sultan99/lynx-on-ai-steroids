package com.lynxonaisteroids.app

import com.lynx.service.devtool.LynxDevToolService
import com.lynx.tasm.LynxEnv
import com.lynx.tasm.service.LynxServiceCenter

object DevToolsInitializer {
  fun registerService() {
    val devToolService = LynxDevToolService.INSTANCE
    LynxServiceCenter.inst().registerService(devToolService)
    devToolService.setLynxDebugPresetValue(true)
    devToolService.setLogBoxPresetValue(true)
    devToolService.setLoadJsBridge(true)
  }

  fun enableDebugSwitches() {
    LynxEnv.inst().enableLynxDebug(true)
    LynxEnv.inst().enableDevtool(true)
    LynxEnv.inst().enableLogBox(true)
  }
}
