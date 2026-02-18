package com.lynxonaisteroids.app

import android.app.Activity
import android.content.Context
import android.graphics.Color
import android.os.Bundle
import android.view.WindowInsetsController
import android.view.WindowManager
import com.lynx.tasm.LynxView
import com.lynx.tasm.LynxViewBuilder
import com.lynx.tasm.behavior.ImageInterceptor
import com.lynx.xelement.XElementBehaviors
import javax.xml.transform.Transformer

class MainActivity : Activity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    window.statusBarColor = Color.TRANSPARENT
    window.navigationBarColor = Color.TRANSPARENT
    window.setFlags(
      WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
      WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS
    )
    val lynxView: LynxView = buildLynxView()
    setContentView(lynxView)

    window.insetsController?.setSystemBarsAppearance(
      WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS,
      WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
    )

    val resourceId = resources.getIdentifier("status_bar_height", "dimen", "android")
    val statusBarHeightPx = if (resourceId > 0) resources.getDimensionPixelSize(resourceId) else 0
    val statusBarHeightDp = (statusBarHeightPx / resources.displayMetrics.density).toInt()

    lynxView.renderTemplateUrl("main.lynx.bundle", """{"statusBarHeight":$statusBarHeightDp}""")
  }

  private fun buildLynxView(): LynxView {
    val viewBuilder = LynxViewBuilder()
    viewBuilder.addBehaviors(XElementBehaviors().create())
    viewBuilder.setTemplateProvider(AssetTemplateProvider(this))
    val lynxView = viewBuilder.build(this)
    lynxView.setImageInterceptor(object : ImageInterceptor {
      override fun shouldRedirectImageUrl(url: String): String {
        if (url.startsWith("/")) {
          return "asset://${url}"
        }
        if (!url.startsWith("http") && !url.startsWith("asset")) {
          return "asset:///${url}"
        }
        return url
      }
      override fun loadImage(
        context: Context, url: String?, reqUrl: String?,
        width: Float, height: Float, transformer: Transformer?,
        handler: ImageInterceptor.CompletionHandler
      ) {
        // No-op: Lynx handles image loading internally
      }
    })
    return lynxView
  }
}
