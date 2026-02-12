package com.lynxonaisteroids.app

import com.lynx.service.devtool.LynxDevToolService
import com.lynx.tasm.LynxEnv
import com.lynx.tasm.service.LynxServiceCenter

object DevToolsInitializer {
  fun registerService() {
    val service = LynxDevToolService.INSTANCE
    LynxServiceCenter.inst().registerService(service)
    service.setLynxDebugPresetValue(true)
    service.setLogBoxPresetValue(true)
    service.setLoadJsBridge(true)
  }

  fun enableDebugSwitches() {
    LynxEnv.inst().enableLynxDebug(true)
    LynxEnv.inst().enableDevtool(true)
    LynxEnv.inst().enableLogBox(true)
  }
}
